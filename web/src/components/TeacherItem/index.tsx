import React, { useCallback } from 'react'

import whatsappIcon from '../../assets/images/icons/whatsapp.svg'

import api from '../../services/api'

import './styles.css'

export interface Teacher {
  id: number
  name: string
  avatar: string
  whatsapp: string
  bio: string
  subject: string
  cost: number
}

interface TeacherItemProps {
  teacher: Teacher
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher }) => {
  const createConnection = useCallback(() => {
    api.post('connections', { user_id: teacher.id })
  }, [teacher.id])

  return (
    <article className="teacher-item">
      <header>
        <img src={teacher.avatar} alt={teacher.name} />

        <div>
          <strong>{teacher.name}</strong>
          <span>{teacher.subject}</span>
        </div>
      </header>

      <p>{teacher.bio}</p>

      <footer>
        <p>
          Preço/hora
          <strong>R$ {teacher.cost}</strong>
        </p>

        <a
          onClick={createConnection}
          href={`https://wa.me/${teacher.whatsapp}`}
          target="_blank"
          rel="noreferrer"
        >
          <img src={whatsappIcon} alt="Whatsapp" />
          Entrar em contato
        </a>
      </footer>
    </article>
  )
}

export default TeacherItem
