import Head from "next/head"
import { FaTwitter, FaGithub } from "react-icons/fa"

export async function getServerSideProps() {
  const githubData = await fetch(
    `https://api.github.com/users/${process.env.BOHR_REPO_OWNER}`
  )
  const { name, login, html_url, avatar_url, twitter_username, bio } =
    await githubData.json()

  const bohrData = await fetch(
    `https://bohr.io/api/public/user/projects/${process.env.BOHR_REPO_OWNER}`
  )
  const projects_borh = await bohrData.json()

  return {
    props: {
      name,
      login,
      html_url,
      avatar_url,
      twitter_username,
      projects_borh,
      bio,
    },
  }
}

function toggleMode() {
  const html = document.documentElement
  html.classList.toggle("light")
}
export default function Index(props) {
  const {
    name,
    login,
    html_url,
    avatar_url,
    twitter_username,
    projects_borh,
    bio,
  } = props

  return (
    <div id="container">
      <Head>
        <title>{`Portifolio - ${name}`}</title>
        <meta content={`Portifolio - ${name}`} property="og:title" />
        <meta content={bio} name="description" />
        <meta content={bio} property="og:description" />
        <meta content={avatar_url} property="og:image" />
      </Head>
      <div id="profile">
        <img src={avatar_url} alt="User picture" />
        <h1>{name}</h1>
        <p id="username">@{login}</p>
      </div>

      <div id="switch" onClick={toggleMode}>
        <button></button>
        <span></span>
      </div>

      <ul id="project-list">
        {projects_borh &&
          projects_borh.map((project) => (
            <li key={project.githubUrl}>
              <a href={project.url} target="_blank">
                {project.name}
              </a>
            </li>
          ))}
      </ul>
      <div id="social-links">
        <a href={html_url} target="_blank">
          <FaGithub />
        </a>
        {twitter_username && (
          <a href={`https://twitter.com/${twitter_username}`} target="_blank">
            <FaTwitter />
          </a>
        )}
      </div>

      <footer>
        Changed with ☕ by{" "}
        <a href="https://portifolio-b2evandro.bohr.io/">B2evandro</a> and
        inspired by <a href="https://rocketseat.com.br/">Rocketseat</a>
      </footer>
    </div>
  )
}
