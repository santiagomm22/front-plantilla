import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  Activity,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
} from "lucide-react";

export default function Dashboard() {
  // Datos de ejemplo para el dashboard
  const metrics = {
    totalUsuarios: 1247,
    usuariosActivos: 892,
    tareasCompletadas: 156,
    tareasPendientes: 23,
    alertas: 3,
    rendimiento: 94.5,
  };

  const recentActivity = [
    {
      id: 1,
      action: "Nuevo usuario registrado",
      user: "Juan Pérez",
      time: "Hace 5 minutos",
      type: "success",
    },
    {
      id: 2,
      action: "Tarea completada",
      user: "María García",
      time: "Hace 15 minutos",
      type: "success",
    },
    {
      id: 3,
      action: "Alerta del sistema",
      user: "Sistema",
      time: "Hace 1 hora",
      type: "warning",
    },
    {
      id: 4,
      action: "Actualización de perfil",
      user: "Carlos López",
      time: "Hace 2 horas",
      type: "info",
    },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "warning":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case "info":
        return <Activity className="h-4 w-4 text-blue-500" />;
      default:
        return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Título del Dashboard */}
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Resumen general del sistema y métricas importantes
        </p>
      </div>

      {/* Tarjetas de métricas principales */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Usuarios
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.totalUsuarios}</div>
            <p className="text-xs text-muted-foreground">
              +12% desde el mes pasado
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Usuarios Activos
            </CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.usuariosActivos}</div>
            <p className="text-xs text-muted-foreground">
              +8% desde la semana pasada
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Tareas Completadas
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {metrics.tareasCompletadas}
            </div>
            <p className="text-xs text-muted-foreground">+23% desde ayer</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rendimiento</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.rendimiento}%</div>
            <p className="text-xs text-muted-foreground">
              +2.1% desde la semana pasada
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Sección de estado del sistema */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Tareas Pendientes
            </CardTitle>
            <CardDescription>
              Tareas que requieren atención inmediata
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-600">
              {metrics.tareasPendientes}
            </div>
            <Badge variant="outline" className="mt-2">
              Requiere atención
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              Alertas del Sistema
            </CardTitle>
            <CardDescription>
              Alertas activas que requieren revisión
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600">
              {metrics.alertas}
            </div>
            <Badge variant="destructive" className="mt-2">
              Crítico
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Estado del Sistema
            </CardTitle>
            <CardDescription>
              Estado general de todos los servicios
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">Operativo</div>
            <Badge
              variant="default"
              className="mt-2 bg-green-100 text-green-800"
            >
              Todo funcionando
            </Badge>
          </CardContent>
        </Card>
      </div>

      {/* Actividad reciente */}
      <Card>
        <CardHeader>
          <CardTitle>Actividad Reciente</CardTitle>
          <CardDescription>
            Últimas acciones realizadas en el sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center space-x-4 p-3 rounded-lg border bg-card"
              >
                {getActivityIcon(activity.type)}
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {activity.action}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {activity.user}
                  </p>
                </div>
                <div className="text-sm text-muted-foreground">
                  {activity.time}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
