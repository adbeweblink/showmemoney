'use client';

import { useEffect, useState } from 'react';
import { getConfig, saveConfig } from '@/lib/storage';
import { formatPrice } from '@/lib/pricing';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { Package, EventType, ServiceType, ConfigData } from '@/types';
import { EVENT_TYPE_LABELS, SERVICE_TYPE_LABELS } from '@/types';

export default function PackagesPage() {
  const [config, setConfig] = useState<ConfigData | null>(null);
  const [editingPackage, setEditingPackage] = useState<Package | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    setConfig(getConfig());
  }, []);

  if (!config) return <div>載入中...</div>;

  const packages = config.packages;

  const handleSave = (pkg: Package) => {
    const isNew = !packages.find(p => p.id === pkg.id);
    let newPackages: Package[];

    if (isNew) {
      newPackages = [...packages, pkg];
    } else {
      newPackages = packages.map(p => p.id === pkg.id ? pkg : p);
    }

    const newConfig = { ...config, packages: newPackages };
    saveConfig(newConfig);
    setConfig(newConfig);
    setIsDialogOpen(false);
    setEditingPackage(null);
  };

  const handleDelete = (id: string) => {
    if (!confirm('確定要刪除此套餐？')) return;

    const newPackages = packages.filter(p => p.id !== id);
    const newConfig = { ...config, packages: newPackages };
    saveConfig(newConfig);
    setConfig(newConfig);
  };

  const handleToggleActive = (id: string) => {
    const newPackages = packages.map(p =>
      p.id === id ? { ...p, isActive: !p.isActive } : p
    );
    const newConfig = { ...config, packages: newPackages };
    saveConfig(newConfig);
    setConfig(newConfig);
  };

  // 按活動類型分組
  const eventTypes: EventType[] = ['event', 'concert', 'family', 'wedding'];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-stone-900">套餐管理</h1>
          <p className="text-stone-500 mt-1">管理各類型活動的報價套餐</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingPackage(null)}>
              新增套餐
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingPackage ? '編輯套餐' : '新增套餐'}
              </DialogTitle>
            </DialogHeader>
            <PackageForm
              package={editingPackage}
              onSave={handleSave}
              onCancel={() => {
                setIsDialogOpen(false);
                setEditingPackage(null);
              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="event">
        <TabsList>
          {eventTypes.map(type => (
            <TabsTrigger key={type} value={type}>
              {EVENT_TYPE_LABELS[type]}
            </TabsTrigger>
          ))}
        </TabsList>

        {eventTypes.map(eventType => {
          const typePackages = packages.filter(p => p.eventType === eventType);

          return (
            <TabsContent key={eventType} value={eventType} className="space-y-4">
              {(['photo', 'video', 'both'] as ServiceType[]).map(serviceType => {
                const servicePackages = typePackages.filter(
                  p => p.serviceType === serviceType
                );

                if (servicePackages.length === 0) return null;

                return (
                  <div key={serviceType} className="space-y-2">
                    <h3 className="font-medium text-stone-700">
                      {SERVICE_TYPE_LABELS[serviceType]}
                    </h3>
                    <div className="grid gap-4">
                      {servicePackages.map(pkg => (
                        <Card
                          key={pkg.id}
                          className={!pkg.isActive ? 'opacity-50' : ''}
                        >
                          <CardContent className="flex items-start justify-between p-4">
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <span className="font-medium">{pkg.name}</span>
                                {!pkg.isActive && (
                                  <Badge variant="secondary">已停用</Badge>
                                )}
                              </div>
                              <p className="text-sm text-stone-500">
                                {pkg.description}
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {pkg.includedItems.map((item, i) => (
                                  <Badge key={i} variant="outline">
                                    {item.name} {item.quantity} {item.unit}
                                    {item.note && ` (${item.note})`}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <div className="text-right space-y-2">
                              <div className="text-xl font-bold">
                                {formatPrice(pkg.basePrice)}
                              </div>
                              <div className="flex gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleToggleActive(pkg.id)}
                                >
                                  {pkg.isActive ? '停用' : '啟用'}
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => {
                                    setEditingPackage(pkg);
                                    setIsDialogOpen(true);
                                  }}
                                >
                                  編輯
                                </Button>
                                <Button
                                  variant="destructive"
                                  size="sm"
                                  onClick={() => handleDelete(pkg.id)}
                                >
                                  刪除
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                );
              })}

              {typePackages.length === 0 && (
                <div className="text-center py-8 text-stone-500">
                  此類型尚無套餐
                </div>
              )}
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
}

interface PackageFormProps {
  package: Package | null;
  onSave: (pkg: Package) => void;
  onCancel: () => void;
}

function PackageForm({ package: pkg, onSave, onCancel }: PackageFormProps) {
  const [formData, setFormData] = useState<Partial<Package>>(
    pkg ?? {
      id: `pkg-${Date.now()}`,
      eventType: 'event',
      serviceType: 'photo',
      name: '',
      description: '',
      basePrice: 0,
      includedItems: [],
      isActive: true,
      sortOrder: 0,
    }
  );

  const [itemsText, setItemsText] = useState(
    pkg?.includedItems.map(item =>
      `${item.name},${item.quantity},${item.unit}${item.note ? `,${item.note}` : ''}`
    ).join('\n') ?? ''
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 解析包含項目
    const includedItems = itemsText
      .split('\n')
      .filter(line => line.trim())
      .map(line => {
        const [name, quantity, unit, note] = line.split(',').map(s => s.trim());
        return {
          name,
          quantity: parseInt(quantity) || 0,
          unit,
          note: note || undefined,
        };
      });

    onSave({
      ...formData,
      includedItems,
    } as Package);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>活動類型</Label>
          <Select
            value={formData.eventType}
            onValueChange={(v) => setFormData({ ...formData, eventType: v as EventType })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(EVENT_TYPE_LABELS).map(([value, label]) => (
                <SelectItem key={value} value={value}>{label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>服務類型</Label>
          <Select
            value={formData.serviceType}
            onValueChange={(v) => setFormData({ ...formData, serviceType: v as ServiceType })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(SERVICE_TYPE_LABELS).map(([value, label]) => (
                <SelectItem key={value} value={value}>{label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label>套餐名稱</Label>
        <Input
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label>說明</Label>
        <Input
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label>基本價格</Label>
        <Input
          type="number"
          value={formData.basePrice}
          onChange={(e) => setFormData({ ...formData, basePrice: parseInt(e.target.value) || 0 })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label>包含項目（每行一項，格式：名稱,數量,單位,備註）</Label>
        <Textarea
          value={itemsText}
          onChange={(e) => setItemsText(e.target.value)}
          placeholder="拍攝時數,4,小時&#10;攝影師,1,位&#10;精修照片,80,張"
          rows={5}
        />
        <p className="text-xs text-stone-500">
          範例：拍攝時數,4,小時 或 成品影片,10,分鐘,精華剪輯
        </p>
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          取消
        </Button>
        <Button type="submit">儲存</Button>
      </div>
    </form>
  );
}
