import './Card.css'

export function Card({ children, className = '' }) {
  return <div className={`card ${className}`}>{children}</div>
}

export function CardHeader({ children, className = '' }) {
  return <div className={`card-header ${className}`}>{children}</div>
}

export function CardContent({ children, className = '' }) {
  return <div className={`card-content ${className}`}>{children}</div>
}

export default Card