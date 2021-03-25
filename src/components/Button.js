import React from "react";

import "components/Button.scss";
import classnames from 'classnames/bind';

export default function Button(props) {
   let buttonClass = classnames({
      'button': true,
      'button--confirm': props.confirm,
      'button--danger': props.danger
   })

   if (props.confirm) {
      buttonClass += " button--confirm";
   }

   if (props.danger) {
      buttonClass += " button--danger";
   }
   return <button onClick={props.onClick} disabled={props.disabled} className={buttonClass}>{props.children}</button>;
}
