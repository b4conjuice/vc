import Main from '@/app/_components/main'
import fetcher from '@/lib/fetcher'
import Title from '@/app/_components/title'

type Deployment = {
  alias: string[]
}

type Project = {
  id: string
  name: string
  latestDeployments: Deployment[]
}

const PROJECT_URL = `https://api.vercel.com/v9/projects?teamId=${process.env.TEAM_ID}`
// const USER_URL = 'https://api.vercel.com/v2/user'

export default async function Home() {
  const { projects }: { projects: Project[] } = await fetcher(PROJECT_URL, {
    headers: {
      Authorization: `Bearer ${process.env.TOKEN!}`,
    },
    method: 'get',
  })
  return (
    <Main className='flex flex-col p-4'>
      <div className='flex flex-grow flex-col space-y-4'>
        <Title>home</Title>
        <ul className='divide-y divide-cb-dusty-blue'>
          {projects.map(p => {
            const { id, name, latestDeployments } = p
            const alias =
              latestDeployments && latestDeployments !== undefined
                ? latestDeployments[0]?.alias[0]
                : ''
            const url = alias ? `https://${alias}` : null
            return (
              <li key={id} className='flex items-center py-4 first:pt-0'>
                {alias && url ? (
                  <a
                    href={url}
                    className='flex w-full text-cb-pink hover:text-cb-pink/75'
                    target='_blank'
                  >
                    <span className='grow'>{name}</span>
                    <span>{alias}</span>
                  </a>
                ) : (
                  <span>{name}</span>
                )}
              </li>
            )
          })}
        </ul>
      </div>
    </Main>
  )
}
