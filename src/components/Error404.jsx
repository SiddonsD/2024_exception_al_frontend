import Button from "./Button";

export function Error404() {
  return (
    <div className="#FFFFF8 flex justify-center">
      <section className="px-4 py-16 flex justify-center items-center space-x-10 container">
        <section className="py-16">
          <h1 className="lg:text-6xl md:text-6xl sm: text-4xl"> 404 </h1>
          <h2 className="text-2xl font-semibold"> Lost your way? </h2>
          <h2 className="text-3xl text-center mt-16 mb-6"> The page you are looking for has moved to a galaxy far, far away...  </h2>
          <h2 className="text-3xl text-center mt-16 mb-6"> Let's get you home to safety.  </h2>
          <div className="flex space-x-4 py-8">
            <Button buttonType="link" href="/home" size="md" buttonStyle="white">
              Take me home!
            </Button>
          </div>
        </section>
        <img
          src="../404static.jpg"
          alt="404 cartoon space scene with astronaut, rocket and planets"
          className="max-w-lg hidden lg:block"
        />
      </section>
    </div>
  );
}
export default Error404;