import {
  Clock,
  FileText,
  Flower2,
  Globe2,
  Image as ImageIcon,
  Leaf,
  MapPin,
  Package,
  PackageCheck,
  Phone,
  Route,
  Send,
  ShieldCheck,
  Snowflake,
  Sparkles,
  Truck,
  Video,
  Warehouse,
  type LucideIcon,
} from "lucide-react";

import type { IconName } from "@/lib/content/icons";

const registry: Record<IconName, LucideIcon> = {
  thermometer: Snowflake,
  truck: Truck,
  warehouse: Warehouse,
  package: Package,
  packageCheck: PackageCheck,
  clock: Clock,
  shield: ShieldCheck,
  route: Route,
  globe: Globe2,
  sparkles: Sparkles,
  flower: Flower2,
  leaf: Leaf,
  send: Send,
  mapPin: MapPin,
  phone: Phone,
  fileText: FileText,
  video: Video,
  image: ImageIcon,
};

export function Icon({
  name,
  className,
  strokeWidth = 1.5,
}: {
  name: IconName;
  className?: string;
  strokeWidth?: number;
}) {
  const Component = registry[name];
  return <Component className={className} strokeWidth={strokeWidth} aria-hidden="true" />;
}
