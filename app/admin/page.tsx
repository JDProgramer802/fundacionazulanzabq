import prisma from '@/lib/prisma';
import { formatDate } from '@/lib/utils';
import { Appointment } from '@prisma/client';
import {
  AlertCircle,
  Calendar,
  CheckCircle2,
  Clock,
  HeartHandshake,
  MessageSquare,
  Users
} from 'lucide-react';

export const dynamic = 'force-dynamic';

async function getDashboardData() {
  const [
    appointmentsPending,
    messagesUnread,
    donationsPending,
    totalDonationsThisMonth,
    volunteersCount,
    testimonialsCount
  ] = await Promise.all([
    prisma.appointment.count({ where: { status: 'pendiente' } }),
    prisma.contactMessage.count({ where: { is_read: false } }),
    prisma.donation.count({ where: { status: 'pendiente_verificacion' } }),
    prisma.donation.aggregate({
      where: {
        status: 'verificada',
        created_at: {
          gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
        }
      },
      _sum: { amount: true }
    }),
    prisma.volunteer.count({ where: { status: 'pendiente' } }),
    prisma.testimonial.count({ where: { active: true } })
  ]);

  const recentAppointments = await prisma.appointment.findMany({
    take: 5,
    orderBy: { created_at: 'desc' }
  });

  return {
    stats: {
      appointmentsPending,
      messagesUnread,
      donationsPending,
      totalDonated: totalDonationsThisMonth._sum.amount || 0,
      volunteersPending: volunteersCount,
      testimonialsActive: testimonialsCount
    },
    recentAppointments
  };
}

export default async function AdminDashboard() {
  const { stats, recentAppointments } = await getDashboardData();

  const cards = [
    { label: 'Citas Pendientes', value: stats.appointmentsPending, icon: Calendar, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Mensajes Nuevos', value: stats.messagesUnread, icon: MessageSquare, color: 'text-primary', bg: 'bg-primary/5' },
    { label: 'Donaciones x Verificar', value: stats.donationsPending, icon: HeartHandshake, color: 'text-orange-600', bg: 'bg-orange-50' },
    { label: 'Voluntarios Nuevos', value: stats.volunteersPending, icon: Users, color: 'text-purple-600', bg: 'bg-purple-50' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-secondary font-primary">Dashboard</h1>
        <p className="text-gray-500">Resumen general de la fundación</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => (
          <div key={card.label} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className={`w-12 h-12 ${card.bg} ${card.color} rounded-2xl flex items-center justify-center`}>
              <card.icon size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">{card.label}</p>
              <p className="text-2xl font-bold text-secondary">{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Appointments */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex justify-between items-center">
            <h2 className="font-bold text-secondary">Últimas Citas</h2>
            <Clock size={20} className="text-gray-400" />
          </div>
          <div className="divide-y divide-gray-50">
            {recentAppointments.length > 0 ? (
              recentAppointments.map((app: Appointment) => (
                <div key={app.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                  <div>
                    <p className="font-medium text-secondary">{app.client_name}</p>
                    <p className="text-xs text-gray-500">{formatDate(app.datetime)}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {app.status === 'pendiente' && <AlertCircle size={16} className="text-orange-500" />}
                    {app.status === 'confirmada' && <CheckCircle2 size={16} className="text-blue-500" />}
                    <span className={`text-xs font-bold uppercase tracking-wider px-2 py-1 rounded-full ${
                      app.status === 'pendiente' ? 'bg-orange-50 text-orange-600' :
                      app.status === 'confirmada' ? 'bg-blue-50 text-blue-600' : 'bg-gray-50 text-gray-600'
                    }`}>
                      {app.status}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="p-8 text-center text-gray-500 italic">No hay citas registradas</p>
            )}
          </div>
        </div>

        {/* Quick Actions / Other info */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 flex flex-col justify-center items-center text-center space-y-4">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-2">
            <HeartHandshake size={40} />
          </div>
          <h2 className="text-2xl font-bold text-secondary">¿Listo para hoy?</h2>
          <p className="text-gray-500 max-w-xs">
            Gestiona tus citas y mensajes desde el menú lateral para mantener al día la labor de la fundación.
          </p>
          <a href="/admin/citas" className="btn-primary">
            Ver Calendario
          </a>
        </div>
      </div>
    </div>
  );
}
