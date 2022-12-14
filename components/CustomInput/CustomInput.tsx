import React, { DetailedHTMLProps, InputHTMLAttributes } from "react"

interface CustomInputType {
  label?: string
  props?: Partial<
    DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
  >
}

const CustomInput = ({ label, props }: CustomInputType) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      margin: 30,
      width: "100%",
    }}
  >
    <label
      htmlFor={label?.trim().toLowerCase()}
      style={{ fontFamily: "monospace" }}
    >
      {label}
    </label>
    <input
      type="text"
      id={label?.trim().toLowerCase()}
      name={label?.trim().toLowerCase()}
      style={{
        width: "100%",
        marginTop: "5px",
        fontSize: "30px",
        padding: 7,
        fontFamily: "monospace",
        borderRadius: 5,
      }}
      {...props}
    />
  </div>
)

export default CustomInput
