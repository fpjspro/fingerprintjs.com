import React, { useState } from 'react'
import classNames from 'classnames'
import { ReactComponent as ExpandMoreSvg } from './expand_more.svg'
import styles from './Collapsible.module.scss'

interface AccordionProps {
  sections: { title: string; content: React.ReactNode }[]
}
export default function Accordion({ sections }: AccordionProps) {
  const [openSection, setOpenSection] = useState<string | undefined>(undefined)

  return (
    <div className={styles.collapsible}>
      {sections.map((section) => (
        <Collapsible
          key={section.title}
          title={section.title}
          open={openSection === section.title}
          onToggle={(title) => setOpenSection(openSection === title ? undefined : title)}
        >
          {section.content}
        </Collapsible>
      ))}
    </div>
  )
}

interface CollapsibleProps {
  title: string
  children: React.ReactNode
  open: boolean
  onToggle: (title: string) => void
}

function Collapsible({ title, children, open, onToggle }: CollapsibleProps) {
  return (
    <div className={styles.item}>
      <header className={styles.header} onClick={() => onToggle(title)}>
        {title}
        <ExpandMoreSvg className={classNames(styles.icon, { [styles.rotated]: open })} />
      </header>
      <div className={classNames(styles.content, { [styles.open]: open })}>{children}</div>
    </div>
  )
}
