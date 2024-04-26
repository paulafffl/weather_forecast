import Search from './components/Search'

const App = () => {
  return (
    <main className="flex justify-center items-center bg-gradient-to-br from-indigo-400 via-sky-200 to-teal-300 h-[100vh] w-full">
      <section className="bg-white bg-opacity-40 w-auto p-16 h-auto flex flex-col items-center justify-center text-center rounded drop-shadow-lg">
        <Search />
      </section>
    </main>
  )
}

export default App
