import { PrismaClient } from '@prisma/client'
import Layout from '../layout/Layout'


export default function Home() {
  return (
    <Layout
      pagina={'Inicio'}
    >
      <h1 className="">
        inicio
      </h1>
    </Layout>
  )
}