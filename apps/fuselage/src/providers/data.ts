import { NhostClient } from '@nhost/nhost-js'
import dataProvider, { GraphQLClient, graphqlWS } from '@/domains/data'

export { liveProvider } from '@/domains/data'

export const nhost = new NhostClient({
  subdomain: process.env.NEXT_PUBLIC_NHOST_SUBDOMAIN,
  region: process.env.NEXT_PUBLIC_NHOST_REGION,
})

export const gqlWebSocketClient = graphqlWS.createClient({
  url: nhost.graphql.wsUrl,
})

const createDataProvider = () => {
  const client = new GraphQLClient(nhost.graphql.httpUrl, {
    headers: () => {
      if (nhost.auth.isAuthenticated()) {
        return {
          authorization: `Bearer ${nhost.auth.getAccessToken()}`,
        }
      }

      return {
        'x-hasura-role': 'public',
      }
    },
  })

  return dataProvider(client)
}

export default createDataProvider
