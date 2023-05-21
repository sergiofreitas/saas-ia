import { NhostClient } from '@nhost/nhost-js'
import dataProvider, { GraphQLClient, graphqlWS } from '@refinedev/hasura'

export const nhost = new NhostClient({
  subdomain: process.env.NEXT_PUBLIC_NHOST_SUBDOMAIN,
  region: process.env.NEXT_PUBLIC_NHOST_REGION,
})

export const gqlWebSocketClient = graphqlWS.createClient({
  url: nhost.graphql.wsUrl,
})

const createDataProvider = () => {
  const client = new GraphQLClient(nhost.graphql.httpUrl, {
    headers: {
      // TODO: mudar para que envie o role do user logado, ou public se não existir token
      'x-hasura-role': 'public',
    },
  })

  return dataProvider(client)
}

export default createDataProvider
