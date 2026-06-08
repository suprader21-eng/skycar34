import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  await prisma.devisItem.deleteMany()
  await prisma.devis.deleteMany()
  await prisma.service.deleteMany()
  await prisma.admin.deleteMany()

  await prisma.service.createMany({
    data: [
      {
        nom: 'Ciel étoilé',
        description: 'Rénovation complète du ciel de toit avec LEDs amphibies, luminosité ajustable',
        prixBase: 300,
        coutProduit: 80,
        remise: 0,
        actif: true,
      },
      {
        nom: 'Intégration multimédia',
        description: 'Écran HD, compatible iOS/Android, système fluide',
        prixBase: 200,
        coutProduit: 60,
        remise: 0,
        actif: true,
      },
      {
        nom: 'Rénovation phares',
        description: 'Clarté cristalline, option teinté +40€, protection nano UV 9H',
        prixBase: 50,
        coutProduit: 15,
        remise: 0,
        actif: true,
      },
      {
        nom: 'Rénovation plastiques intérieurs',
        description: 'Nettoyage profond + traitement nano céramique + protection UV',
        prixBase: 50,
        coutProduit: 12,
        remise: 0,
        actif: true,
      },
      {
        nom: 'Pack complet intérieur',
        description: 'Tous les services plastiques + phares',
        prixBase: 120,
        coutProduit: 35,
        remise: 0,
        actif: true,
      },
    ],
  })

  const hashedPassword = await bcrypt.hash('Skycar34Admin!', 12)
  await prisma.admin.create({
    data: {
      email: 'admin@skycar34.fr',
      password: hashedPassword,
    },
  })

  console.log('Seed terminé avec succès.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
