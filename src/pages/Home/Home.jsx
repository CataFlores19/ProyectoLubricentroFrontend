import React from 'react'
import Card from '../../components/Card/Card'
import Button from '../../components/Button/Button'
import styles from './Home.module.css'

const Home = () => {
  return (
    <div className={`container py-5 ${styles.homeContainer}`}>
      <div className="row">
        <div className="col-12 text-center mb-5">
          <h1 className="display-4 fw-bold text-primary">
            Bienvenido al Proyecto Final
          </h1>
          <p className="lead text-muted">
            Este es un proyecto frontend desarrollado en React con Bootstrap 5
          </p>
        </div>
      </div>
      
      <div className="row g-4">
        <div className="col-md-4">
          <Card title="React 18">
            <p className="card-text">
              Utiliza la última versión de React con hooks y componentes funcionales.
            </p>
            <Button variant="primary">Aprender más</Button>
          </Card>
        </div>
        
        <div className="col-md-4">
          <Card title="React Router">
            <p className="card-text">
              Navegación fluida entre páginas con React Router DOM.
            </p>
            <Button variant="success">Ver rutas</Button>
          </Card>
        </div>
        
        <div className="col-md-4">
          <Card title="Bootstrap 5">
            <p className="card-text">
              Diseño responsivo y componentes modernos con Bootstrap 5.
            </p>
            <Button variant="info">Componentes</Button>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Home