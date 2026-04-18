import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Create Admin User
  const adminEmail = process.env.ADMIN_EMAIL || 'fundacionazulanza@gmail.com';
  const hashedPassword = await bcrypt.hash('admin123', 10);

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      password_hash: hashedPassword,
      role: 'admin',
    },
  });

  // Default Settings
  const defaultSettings = [
    { key: 'site_title', value: 'Fundación Azulanza' },
    { key: 'site_description', value: 'Fundación Azulanza brinda asistencia integral en salud mental, seguridad alimentaria y desarrollo comunitario.' },
    { key: 'global_description', value: 'Asistencia integral en salud mental y apoyo comunitario.' },
    { key: 'contact_email', value: 'fundacionazulanza@gmail.com' },
    { key: 'contact_phone', value: '+57 322 721 2546' },
    { key: 'contact_address', value: 'Barranquilla, Colombia' },
    { key: 'whatsapp_number', value: '573227212546' },
    { key: 'nit', value: '901645631-4' },
    { key: 'social_links', value: JSON.stringify({
      facebook: 'https://facebook.com/fundacionazulanza',
      instagram: 'https://instagram.com/fundacionazulanza',
      twitter: 'https://twitter.com/azulanza',
    }) },
    { key: 'home_hero_title', value: 'Sanando Corazones, Construyendo Futuros' },
    { key: 'home_hero_subtitle', value: 'Brindamos apoyo emocional y herramientas para el bienestar de nuestra comunidad.' },
    { key: 'mission_text', value: 'Nuestra misión es transformar vidas a través del apoyo psicológico y social.' },
    { key: 'vision_text', value: 'Ser referentes en salud mental comunitaria en toda la región.' },
    { key: 'history_text', value: 'Fundación Azulanza nació del deseo de ayudar a quienes más lo necesitan...' },
  ];

  for (const setting of defaultSettings) {
    await prisma.setting.upsert({
      where: { key: setting.key },
      update: {},
      create: setting,
    });
  }

  console.log('Seed completed successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
