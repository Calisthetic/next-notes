import { google } from "googleapis";

export async function getServerSideProps({ query }: any) {
  // Auth
  const auth = await google.auth.getClient({ scopes: []});

  return {
  }
}

export default function Post({ title, content }:any) {
  return (
    <article>
      <h1>{title}</h1>
      <div dangerouslySetInnerHTML={{ __html: content }}></div>
    </article>
  )
}