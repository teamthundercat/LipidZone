import React, { useState, useEffect } from 'react';
import { Key, Shield, AlertTriangle, Check, X, MoreVertical, Plus, Trash, Edit, Download, Upload } from 'lucide-react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { cn } from '../utils/cn';

// Define types
interface ApiKey {
  id: string;
  name: string;
  provider: string;
  key: string;
  status: 'active' | 'inactive' | 'expired';
  created: string;
  expires: string;
}

interface LlmProvider {
  id: string;
  name: string;
  description: string;
  features: string[];
  tier: number;
  logo?: string;
}

// Sample data
const LLM_PROVIDERS: LlmProvider[] = [
  {
    id: 'openai',
    name: 'OpenAI',
    description: 'Leading AI research lab and creator of GPT models',
    features: [
      'GPT-4 and GPT-3.5 models',
      'Text completion and chat',
      'Image generation with DALL-E',
      'Function calling capabilities'
    ],
    tier: 1
  },
  {
    id: 'anthropic',
    name: 'Anthropic',
    description: 'AI safety company focused on reliable, interpretable AI systems',
    features: [
      'Claude models',
      'Long context windows',
      'Constitutional AI approach',
      'Reduced hallucinations'
    ],
    tier: 3
  },
  {
    id: 'google',
    name: 'Google AI',
    description: 'Google\'s AI research and applications',
    features: [
      'Gemini models',
      'Multimodal capabilities',
      'Strong reasoning abilities',
      'Integration with Google services'
    ],
    tier: 3
  },
  {
    id: 'mistral',
    name: 'Mistral AI',
    description: 'European AI company focused on efficient, open models',
    features: [
      'Mistral and Mixtral models',
      'Efficient architecture',
      'Open weights for some models',
      'Strong performance-to-size ratio'
    ],
    tier: 2
  }
];

// Sample API keys
const SAMPLE_API_KEYS: ApiKey[] = [
  {
    id: '1',
    name: 'OpenAI Production',
    provider: 'openai',
    key: 'sk-••••••••••••••••••••••••••••••',
    status: 'active',
    created: '2023-10-15',
    expires: '2024-10-15'
  },
  {
    id: '2',
    name: 'Anthropic Development',
    provider: 'anthropic',
    key: 'sk-ant-••••••••••••••••••••••••••',
    status: 'inactive',
    created: '2023-11-20',
    expires: '2024-11-20'
  }
];

// API Key Modal Component
function ApiKeyModal({ 
  isOpen, 
  onClose, 
  onSave,
  editKey
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  onSave: (key: Omit<ApiKey, 'id' | 'created'>) => void;
  editKey?: ApiKey;
}) {
  const [name, setName] = useState(editKey?.name || '');
  const [provider, setProvider] = useState(editKey?.provider || 'openai');
  const [key, setKey] = useState(editKey?.key || '');
  const [status, setStatus] = useState<'active' | 'inactive'>(editKey?.status === 'expired' ? 'inactive' : (editKey?.status || 'active'));
  const [expires, setExpires] = useState(editKey?.expires || '');

  useEffect(() => {
    if (editKey) {
      setName(editKey.name);
      setProvider(editKey.provider);
      setKey(editKey.key);
      setStatus(editKey.status === 'expired' ? 'inactive' : editKey.status);
      setExpires(editKey.expires);
    } else {
      setName('');
      setProvider('openai');
      setKey('');
      setStatus('active');
      setExpires('');
    }
  }, [editKey, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      name,
      provider,
      key,
      status,
      expires
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">
            {editKey ? 'Edit API Key' : 'Add New API Key'}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Production API Key"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Provider
              </label>
              <select
                value={provider}
                onChange={(e) => setProvider(e.target.value)}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              >
                {LLM_PROVIDERS.map(provider => (
                  <option key={provider.id} value={provider.id}>
                    {provider.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                API Key
              </label>
              <input
                type="text"
                value={key}
                onChange={(e) => setKey(e.target.value)}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="sk-..."
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="status"
                    value="active"
                    checked={status === 'active'}
                    onChange={() => setStatus('active')}
                    className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Active</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="status"
                    value="inactive"
                    checked={status === 'inactive'}
                    onChange={() => setStatus('inactive')}
                    className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Inactive</span>
                </label>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Expiration Date (Optional)
              </label>
              <input
                type="date"
                value={expires}
                onChange={(e) => setExpires(e.target.value)}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
          
          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md text-sm font-medium hover:bg-blue-600"
            >
              {editKey ? 'Update' : 'Add'} API Key
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// API Key Row Component
function ApiKeyRow({ 
  apiKey, 
  onAction,
  isSelected,
  onSelect
}: { 
  apiKey: ApiKey; 
  onAction: (action: 'edit' | 'delete' | 'toggle', key: ApiKey) => void;
  isSelected: boolean;
  onSelect: (id: string, selected: boolean) => void;
}) {
  const [showMenu, setShowMenu] = useState(false);
  const provider = LLM_PROVIDERS.find(p => p.id === apiKey.provider);

  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={(e) => onSelect(apiKey.id, e.target.checked)}
          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">{apiKey.name}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{provider?.name || apiKey.provider}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500 font-mono">{apiKey.key}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={cn(
          "px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full",
          apiKey.status === 'active' ? "bg-green-100 text-green-800" :
          apiKey.status === 'inactive' ? "bg-gray-100 text-gray-800" :
          "bg-red-100 text-red-800"
        )}>
          {apiKey.status.charAt(0).toUpperCase() + apiKey.status.slice(1)}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {apiKey.created}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {apiKey.expires}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium relative">
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="text-gray-400 hover:text-gray-500"
        >
          <MoreVertical className="h-5 w-5" />
        </button>
        
        {showMenu && (
          <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
            <div className="py-1" role="menu" aria-orientation="vertical">
              <button
                onClick={() => {
                  onAction('edit', apiKey);
                  setShowMenu(false);
                }}
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                role="menuitem"
              >
                <Edit className="mr-3 h-4 w-4 text-gray-400" />
                Edit
              </button>
              <button
                onClick={() => {
                  onAction('toggle', apiKey);
                  setShowMenu(false);
                }}
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                role="menuitem"
              >
                {apiKey.status === 'active' ? (
                  <>
                    <X className="mr-3 h-4 w-4 text-gray-400" />
                    Deactivate
                  </>
                ) : (
                  <>
                    <Check className="mr-3 h-4 w-4 text-gray-400" />
                    Activate
                  </>
                )}
              </button>
              <button
                onClick={() => {
                  onAction('delete', apiKey);
                  setShowMenu(false);
                }}
                className="flex items-center px-4 py-2 text-sm text-red-700 hover:bg-gray-100 w-full text-left"
                role="menuitem"
              >
                <Trash className="mr-3 h-4 w-4 text-red-400" />
                Delete
              </button>
            </div>
          </div>
        )}
      </td>
    </tr>
  );
}

// Sortable Provider Card Component
function SortableProviderCard({ 
  provider, 
  index,
  currentTier
}: { 
  provider: LlmProvider; 
  index: number;
  currentTier: number;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({id: provider.id});
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const isLocked = provider.tier > currentTier;

  return (
    <div 
      ref={setNodeRef} 
      style={style}
      className={cn(
        "border rounded-lg p-4",
        isLocked ? "bg-gray-50 border-gray-200" : "bg-white border-gray-200"
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {!isLocked && (
            <div 
              {...attributes} 
              {...listeners}
              className="cursor-grab p-1 hover:bg-gray-100 rounded"
            >
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8h16M4 16h16" />
              </svg>
            </div>
          )}
          
          <div>
            <h4 className="font-medium text-gray-900">{provider.name}</h4>
            <p className="text-sm text-gray-500">{provider.description}</p>
          </div>
        </div>
        
        {isLocked ? (
          <div className="flex items-center gap-1 text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
            <Shield className="w-3 h-3" />
            <span>Tier {provider.tier}+</span>
          </div>
        ) : (
          <div className="flex items-center gap-1 text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded">
            <Check className="w-3 h-3" />
            <span>Available</span>
          </div>
        )}
      </div>
    </div>
  );
}

export function ApiSettings({ 
  apiKey, 
  onUpdate 
}: { 
  apiKey?: string; 
  onUpdate: (key: string) => void;
}) {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>(SAMPLE_API_KEYS);
  const [showModal, setShowModal] = useState(false);
  const [editingKey, setEditingKey] = useState<ApiKey>();
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [providerOrder, setProviderOrder] = useState(LLM_PROVIDERS.map(p => p.id));
  const [currentTier, setCurrentTier] = useState(1); // Free tier by default
  
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: any) => {
    const {active, over} = event;
    
    if (active.id !== over.id) {
      setProviderOrder(items => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);
        
        const newOrder = [...items];
        newOrder.splice(oldIndex, 1);
        newOrder.splice(newIndex, 0, active.id);
        
        return newOrder;
      });
    }
  };

  const handleAddKey = (newKey: Omit<ApiKey, 'id' | 'created'>) => {
    if (editingKey) {
      // Update existing key
      setApiKeys(keys => keys.map(key => 
        key.id === editingKey.id 
          ? { ...key, ...newKey } 
          : key
      ));
      setEditingKey(undefined);
    } else {
      // Add new key
      const key: ApiKey = {
        id: Math.random().toString(36).substring(2, 9),
        created: new Date().toISOString().split('T')[0],
        ...newKey
      };
      setApiKeys([...apiKeys, key]);
    }
  };

  const handleKeyAction = (action: 'edit' | 'delete' | 'toggle', key: ApiKey) => {
    switch (action) {
      case 'edit':
        setEditingKey(key);
        setShowModal(true);
        break;
      case 'delete':
        setApiKeys(keys => keys.filter(k => k.id !== key.id));
        break;
      case 'toggle':
        setApiKeys(keys => keys.map(k => 
          k.id === key.id 
            ? { ...k, status: k.status === 'active' ? 'inactive' : 'active' } 
            : k
        ));
        break;
    }
  };

  const handleSelectKey = (id: string, selected: boolean) => {
    if (selected) {
      setSelectedKeys([...selectedKeys, id]);
    } else {
      setSelectedKeys(selectedKeys.filter(key => key !== id));
    }
  };

  const handleSelectAllChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectAll(e.target.checked);
    if (e.target.checked) {
      setSelectedKeys(apiKeys.map(key => key.id));
    } else {
      setSelectedKeys([]);
    }
  };

  const handleBulkAction = (action: 'delete' | 'activate' | 'deactivate') => {
    switch (action) {
      case 'delete':
        setApiKeys(keys => keys.filter(key => !selectedKeys.includes(key.id)));
        break;
      case 'activate':
        setApiKeys(keys => keys.map(key => 
          selectedKeys.includes(key.id) 
            ? { ...key, status: 'active' } 
            : key
        ));
        break;
      case 'deactivate':
        setApiKeys(keys => keys.map(key => 
          selectedKeys.includes(key.id) 
            ? { ...key, status: 'inactive' } 
            : key
        ));
        break;
    }
    setSelectedKeys([]);
    setSelectAll(false);
  };

  return (
    <div className="space-y-6">
      {/* API Keys Section */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="flex items-center px-4 py-3 bg-gray-100 border-b border-gray-200">
          <Key className="w-5 h-5 text-blue-600 mr-2" />
          <h3 className="text-lg font-semibold text-gray-800">API Keys</h3>
        </div>
        
        <div className="p-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-3">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setShowModal(true)}
                className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add Key
              </button>
              
              {selectedKeys.length > 0 && (
                <>
                  <button
                    onClick={() => handleBulkAction('activate')}
                    className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <Check className="w-4 h-4 mr-1 text-green-500" />
                    Activate
                  </button>
                  <button
                    onClick={() => handleBulkAction('deactivate')}
                    className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <X className="w-4 h-4 mr-1 text-red-500" />
                    Deactivate
                  </button>
                  <button
                    onClick={() => handleBulkAction('delete')}
                    className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <Trash className="w-4 h-4 mr-1 text-red-500" />
                    Delete
                  </button>
                </>
              )}
            </div>
            
            <div className="flex gap-2">
              <button
                className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Upload className="w-4 h-4 mr-1" />
                Import
              </button>
              <button
                className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Download className="w-4 h-4 mr-1" />
                Export
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto border border-gray-200 rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <input
                      type="checkbox"
                      checked={selectAll}
                      onChange={handleSelectAllChange}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Provider
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    API Key
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Expires
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {apiKeys.map((key) => (
                  <ApiKeyRow
                    key={key.id}
                    apiKey={key}
                    onAction={handleKeyAction}
                    isSelected={selectedKeys.includes(key.id)}
                    onSelect={handleSelectKey}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Provider Priority Section */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="flex items-center px-4 py-3 bg-gray-100 border-b border-gray-200">
          <Shield className="w-5 h-5 text-blue-600 mr-2" />
          <h3 className="text-lg font-semibold text-gray-800">Provider Priority</h3>
        </div>
        
        <div className="p-6">
          <div className="mb-4 flex items-center gap-2 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
            <AlertTriangle className="w-5 h-5 text-yellow-600" />
            <p className="text-sm text-yellow-700">
              Drag and drop to reorder providers. The order determines which provider is used when multiple are available.
            </p>
          </div>
          
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={providerOrder}
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-3">
                {providerOrder.map((id, index) => {
                  const provider = LLM_PROVIDERS.find(p => p.id === id);
                  if (!provider) return null;
                  return (
                    <SortableProviderCard
                      key={provider.id}
                      provider={provider}
                      index={index}
                      currentTier={currentTier}
                    />
                  );
                })}
              </div>
            </SortableContext>
          </DndContext>
        </div>
      </div>

      <ApiKeyModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setEditingKey(undefined);
        }}
        onSave={handleAddKey}
        editKey={editingKey}
      />
    </div>
  );
}