# Leaderboard para Liga de Fútbol

Esta aplicación muestra una tabla de posiciones (leaderboard) para una liga de fútbol, permitiendo a los usuarios ver estadísticas de equipos, filtrar y ordenar la tabla, y guardar equipos favoritos.

## Características
- **Visualización de datos**: Muestra equipos con sus registros de victorias, derrotas, empates y puntos.
- **Ordenación flexible**: Permite ordenar la tabla por diferentes métricas (victorias, derrotas, empates y puntos).
- **Filtrado por nombre**: Búsqueda rápida de equipos por nombre.
- **Sistema de favoritos**: Marca equipos como favoritos y accede a ellos en una vista separada.
- **Detalles de equipo**: Visualiza información detallada de cada equipo al hacer clic en su escudo o botón de información.
- **Persistencia de datos**: Los favoritos se guardan en localStorage para mantenerlos entre sesiones.
- **Diseño responsivo**: Experiencia optimizada tanto para dispositivos móviles como de escritorio.
- **Feedback visual**: Notificaciones y animaciones para mejorar la experiencia de usuario.

## Tecnologías utilizadas

- React.js con Vite
- TypeScript
- TailwindCSS para estilos
- Lucide React para iconos
- json-server para simular la API

## Configuración del proyecto

### Requisitos previos

- Node.js
- npm o yarn

### Instalación

1. Clona este repositorio:
```bash
git clone https://github.com/AndreeJimenez/Football-Leaderboard.git
cd Football-Leaderboard
```


2. Instala las dependencias:
```bash
npm install
- o -
yarn install
```

3. Inicia el servidor de desarrollo:
```bash
npm run dev
- o -
yarn dev
```

1. En una terminal separada, inicia json-server:
```bash
npm run server
- o -
yarn server
```

La aplicación estará disponible en [http://localhost:5173](http://localhost:5173).

El servidor estará disponible en [http://localhost:3000](http://localhost:3001).

## Estructura del proyecto

```
├── public/              # Archivos estáticos
├── src/                 # Código fuente
│   ├── __tests__/       # Tests unitarios
│   ├── components/      # Componentes reutilizables
│   │   ├── FavoritesTable.tsx    # Tabla de equipos favoritos
│   │   ├── Notification.tsx      # Componente de notificaciones
│   │   ├── TeamDetailsModal.tsx  # Modal de detalles de equipo
│   │   └── TeamTable.tsx         # Tabla principal de los equipos
│   ├── hooks/                    # Custom hooks
│   │   ├── useFavorites.tsx      # Almacenamiento de favoritos
│   ├── types.ts/        # Definiciones de tipos TypeScript
│   ├── App.tsx          # Componente principal
│   ├── index.css        # Estilos globales y Tailwind
│   └── main.tsx         # Punto de entrada
├── db.json              # Base de datos para json-server
├── tailwind.config.js   # Configuración de Tailwind CSS
├── vite.config.js       # Configuración de Vite
└── README.md            # Documentación del proyecto
```

## Decisiones técnicas

### Arquitectura

- **Vite + React**: Elegido por su velocidad de desarrollo y optimización de producción.
- **TypeScript**: Para tipado estático y mejor experiencia de desarrollo.
- **Tailwind CSS**: Para estilos rápidos y consistentes.
- **Estado local**: Para esta aplicación, el estado local de React es suficiente. En una aplicación más grande, consideraría usar React Context o una librería de gestión de estado como Redux.

### Persistencia de datos

- **localStorage**: Almacenamiento local para mantener favoritos entre sesiones.
- **json-server**: API mock para simular un backend real.


### Experiencia de usuario

- **Feedback visual**: Notificaciones, animaciones y transiciones para mejorar la experiencia.
- **Diseño responsivo**: Adaptación a diferentes tamaños de pantalla.
- **Accesibilidad**: Uso de atributos ARIA y enfoque en la accesibilidad.

Playbypoint :green_heart: