import React, { FC } from 'react';
import { Link } from 'react-router-dom';
interface Props {
  href?: string  
}

export const SmartLink: FC<Props> = ({
  href = "",
  children,
}) => {
  return(
    <Link to={href}>
      {children}
    </Link>
  )
}