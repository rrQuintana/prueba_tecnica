import AnimatedPage from "../../shared/AnimatedPage"
import LoginForm from "./components/LoginForm"

function Login() {
  return (
    <AnimatedPage>
      <div className="flex w-full h-screen">
        <div className="flex flex-col bg-gradient-to-b from-cyan-500 to-blue-600 w-1/2 h-full p-8">
          <h1 className="text-white font-medium">Login</h1>
          <div className="my-auto w-full space-y-1">
            <h1 className="text-white text-5xl font-semibold my-auto">User administration</h1>
            <h1 className="text-white text-6xl font-semibold my-auto">Service using</h1>
            <h1 className="text-white text-7xl font-semibold my-auto">Redux + JWT</h1>
          </div>
          <p className="text-white">Made with ❤ by <a className="underline" href="https://github.com/rrQuintana" target="_blank" rel="noreferrer">rrQuintana</a> </p>
        </div>
        <div className="bg-white flex w-1/2 h-full items-center justify-center">
          <LoginForm />
        </div>
      </div>
    </AnimatedPage>
  )
}

export default Login