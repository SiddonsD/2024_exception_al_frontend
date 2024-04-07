import Button from "./Button";

export function Error404() {
  return (
    <section class="items-center justify-center py-16 px-4 flex w-full sm:max-w-[40.00rem] md:max-w-3xl lg:max-w-5xl xl:max-w-7xl 2xl:max-w-screen-2xl">
    <div className="flex-col justify-center items-center">
        <img
          src="../404static.png"
          alt="404 cartoon space scene with astronaut, rocket and planets"
        />
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
        </div>
    </section>
  );
}
export default Error404;