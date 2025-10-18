import React from 'react'
import { Link } from 'react-router-dom'
import Card from '../../components/Card/Card'
import Button from '../../components/Button/Button'
import styles from './NotFound.module.css'

const NotFound = () => {
  return (
    <div className={`container py-5 ${styles.notFoundContainer}`}>
      <div className="row justify-content-center">
        <div className="col-lg-6 text-center">
          <Card>
            <div className="mb-4">
              <h1 className="display-1 fw-bold text-primary">404</h1>
              <h2 className="h4 mb-3">Página no encontrada</h2>
              <p className="text-muted mb-4">
                La página que estás buscando no existe o ha sido movida.
              </p>
            </div>
            <Link to="/">
              <Button variant="primary" size="lg">
                Volver al Inicio
              </Button>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default NotFound