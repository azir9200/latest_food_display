import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MenuItem } from "@/types/restaurant";
import { DollarSign, Edit, Trash2 } from "lucide-react";
import Image from "next/image";

interface MenuItemCardProps {
  item: MenuItem;
  editable?: boolean;
  onEdit?: (item: MenuItem) => void;
  onDelete?: (itemId: string) => void;
}

const MenuItemCard = ({
  item,
  editable = false,
  onEdit,
  onDelete,
}: MenuItemCardProps) => {
  return (
    <Card className="overflow-hidden hover-lift border-border/50 bg-card rounded-xl group">
      <div className="flex gap-4 p-4">
        <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
          <Image
            height={200}
            width={200}
            src={
              item.image ||
              "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200"
            }
            alt={item.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h4 className="font-semibold text-foreground truncate">
                {item.name}
              </h4>
              {item.category && (
                <Badge variant="outline" className="text-xs mt-1">
                  {item.category}
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-1 bg-primary/10 px-3 py-1 rounded-full flex-shrink-0">
              <DollarSign className="h-3.5 w-3.5 text-primary" />
              <span className="font-bold text-primary">{item.price}</span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
            {item.description}
          </p>
          {editable && (
            <div className="flex gap-2 mt-3">
              <Button
                variant="outline"
                size="sm"
                className="h-8 text-xs"
                onClick={() => onEdit?.(item)}
              >
                <Edit className="h-3 w-3 mr-1" />
                Edit
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-8 text-xs text-destructive hover:bg-destructive/10"
                onClick={() => onDelete?.(item.id)}
              >
                <Trash2 className="h-3 w-3 mr-1" />
                Delete
              </Button>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default MenuItemCard;
