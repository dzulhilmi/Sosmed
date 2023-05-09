import '@styles/globals.css'
import Sidebar from '@components/Sidebar'

export const metadata = {
  title: "Sosmed",
  description: 'Discover & Share Post'
}


export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body>
        <div className="main">
          <div className='gradient' />
        </div>

        <main className="app">
          <Sidebar />
          {children}
        </main>
      </body>
    </html>
  )
}
