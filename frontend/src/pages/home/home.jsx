import { Link } from "react-router-dom";
import { useState} from "react";

export default function Home() {
  const [user] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? storedUser : "Invitado";
  });

  
    return(
       
       <div className="min-h-screen bg-sky-50 p-6">

      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-center mb-10">
        <h1 className="text-3xl font-bold text-sky-700">
          Plataforma Educativa 📚
        </h1>

        <p className="text-gray-600 mt-3 md:mt-0">
          Bienvenido a tu panel de aprendizaje {user}
        </p>
      </header>

      {/* Contenedor de cards */}
      <div className="flex flex-wrap gap-20 justify-center">

        {/* Card 1 */}
        <Link to="/curso/1" className="w-full sm:w-[45%] lg:w-[20%]">
          <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition duration-300 cursor-pointer h-full flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-semibold text-sky-600 mb-2">
                Inglés Básico
              </h2>
              <p className="text-gray-600">
                Aprende vocabulario, colores y números.
              </p>
            </div>
           <div className="image">
            <img src="https://img.freepik.com/vector-gratis/concepto-linea-arbol-educacion-iconos-recursos-entrenamiento-aprendizaje-electronico-vector-ejemplo_98292-6759.jpg" srcset="https://img.freepik.com/vector-gratis/concepto-linea-arbol-educacion-iconos-recursos-entrenamiento-aprendizaje-electronico-vector-ejemplo_98292-6759.jpg?t=st=1772395416~exp=1772399016~hmac=0652590fbeb1af6971f27eee74a0783d7d9cdea8fa2a8d39707a79b54fa8d408&amp;w=360 360w, https://img.freepik.com/vector-gratis/concepto-linea-arbol-educacion-iconos-recursos-entrenamiento-aprendizaje-electronico-vector-ejemplo_98292-6759.jpg?t=st=1772395416~exp=1772399016~hmac=0652590fbeb1af6971f27eee74a0783d7d9cdea8fa2a8d39707a79b54fa8d408&amp;w=740 740w, https://img.freepik.com/vector-gratis/concepto-linea-arbol-educacion-iconos-recursos-entrenamiento-aprendizaje-electronico-vector-ejemplo_98292-6759.jpg?t=st=1772395416~exp=1772399016~hmac=0652590fbeb1af6971f27eee74a0783d7d9cdea8fa2a8d39707a79b54fa8d408&amp;w=1060 1060w, https://img.freepik.com/vector-gratis/concepto-linea-arbol-educacion-iconos-recursos-entrenamiento-aprendizaje-electronico-vector-ejemplo_98292-6759.jpg?t=st=1772395416~exp=1772399016~hmac=0652590fbeb1af6971f27eee74a0783d7d9cdea8fa2a8d39707a79b54fa8d408&amp;w=1480 1480w, https://img.freepik.com/vector-gratis/concepto-linea-arbol-educacion-iconos-recursos-entrenamiento-aprendizaje-electronico-vector-ejemplo_98292-6759.jpg?t=st=1772395416~exp=1772399016~hmac=0652590fbeb1af6971f27eee74a0783d7d9cdea8fa2a8d39707a79b54fa8d408&amp;w=2000 2000w" width="626" height="626" alt="El concepto en línea del árbol de la educación con los iconos de los recursos de entrenamiento del aprendizaje electrónico vector el ejemplo" fetchpriority="high" sizes="(max-width: 480px) 100vw, (min-aspect-ratio: 626/626) 100%, (max-width: 1024px) calc(100vw - 40px), calc(100vw - 540px)" class="size-full object-contain sm:rounded-xl"></img>
            </div>
            <div className="mt-6">
              <button className="w-full bg-sky-500 text-white py-2 rounded-lg hover:bg-sky-600 transition">
                Entrar
              </button>
            </div>
          </div>
        </Link>

        {/* Card 2 */}
        <Link to="/curso/2" className="w-full sm:w-[45%] lg:w-[20%]">
          <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition duration-300 cursor-pointer h-full flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-semibold text-sky-600 mb-2">
                Juegos Interactivos
              </h2>
              <p className="text-gray-600">
                Refuerza lo aprendido con actividades dinámicas.
              </p>
            </div>
            <div className="image">
            <img src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExdGUwOWtqbHZrN2FiZWNpY3RoNnY3dmw2bndsdmxvcnNvdzFpc3N0eiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/t9iZKlppouAANqFZQc/giphy.gif" alt="" />
            </div>
            <div className="mt-6">
              <button className="w-full bg-sky-500 text-white py-2 rounded-lg hover:bg-sky-600 transition">
                Jugar
              </button>
            </div>
          </div>
        </Link>

        {/* Card 3 */}
        <Link to="/curso/3" className="w-full sm:w-[45%] lg:w-[20%]">
          <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition duration-300 cursor-pointer h-full flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-semibold text-sky-600 mb-2">
                Exámenes
              </h2>
              <p className="text-gray-600">
                Evalúa tu progreso y gana puntos.
              </p>
            </div>
            <div className="image " >
            <img src="https://img.freepik.com/vector-gratis/diseno-abstracto-fondo_1212-407.jpg" srcset="https://img.freepik.com/vector-gratis/diseno-abstracto-fondo_1212-407.jpg?t=st=1772394808~exp=1772398408~hmac=52f1106d8530e6036fecbdab48a4b3810f64cda8404ebb879db203f97739914e&amp;w=360 360w, https://img.freepik.com/vector-gratis/diseno-abstracto-fondo_1212-407.jpg?t=st=1772394808~exp=1772398408~hmac=52f1106d8530e6036fecbdab48a4b3810f64cda8404ebb879db203f97739914e&amp;w=740 740w, https://img.freepik.com/vector-gratis/diseno-abstracto-fondo_1212-407.jpg?t=st=1772394808~exp=1772398408~hmac=52f1106d8530e6036fecbdab48a4b3810f64cda8404ebb879db203f97739914e&amp;w=1060 1060w, https://img.freepik.com/vector-gratis/diseno-abstracto-fondo_1212-407.jpg?t=st=1772394808~exp=1772398408~hmac=52f1106d8530e6036fecbdab48a4b3810f64cda8404ebb879db203f97739914e&amp;w=1480 1480w, https://img.freepik.com/vector-gratis/diseno-abstracto-fondo_1212-407.jpg?t=st=1772394808~exp=1772398408~hmac=52f1106d8530e6036fecbdab48a4b3810f64cda8404ebb879db203f97739914e&amp;w=2000 2000w" width="100" height="200" alt="Diseño abstracto del fondo" fetchpriority="high" sizes="(max-width: 480px) 100vw, (min-aspect-ratio: 1300/1300) 100%, (max-width: 1024px) calc(100vw - 40px), calc(100vw - 540px)" class="size-full object-contain sm:rounded-xl"></img>
            </div>
            <div className="mt-6">
              <button className="w-full bg-sky-500 text-white py-2 rounded-lg hover:bg-sky-600 transition">
                Evaluar
              </button>
            </div>
          </div>
        </Link>

      </div>
    </div>
    )
}