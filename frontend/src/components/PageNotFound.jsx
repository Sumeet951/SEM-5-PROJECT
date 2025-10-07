import error404 from "../assets/404.png"

function PageNotFound() {
    return ( <div className="grid grid-cols-2">
        <div className="text-center flex flex-col justify-center">
    <h1 className="text-3xl text-red-700 font-extrabold ">Oops!</h1>
    <h3 className="text-xl">The page you are looking for doesn't exist.</h3>
    </div>
    <div>
        <img src={error404} alt="404 not found" />
    </div>
    </div> );
}

export default PageNotFound;