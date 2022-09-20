import React, { ReactNode } from 'react'

import { Container } from '@nextui-org/react'

interface PageSectionProps {
  children: ReactNode
}

const PageSection: React.FC<PageSectionProps> = ({
  children
}) => {
  return (
    <Container fluid>
      {children}
    </Container>
  )
}

export default PageSection
