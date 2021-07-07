import React, { useState, useEffect } from "react";
import axios from "axios";
import { axiosWithAuth } from "./utils/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  console.log("update Colors", updateColors)
  
  console.log("colors in colorList", colors);
  // console.log("editing", editing)
  console.log("colorToEdit", colorToEdit)

  // const [color, setColor] = useState([]);


  // useEffect(() => {
  //   axiosWithAuth()
  //     .get("http://localhost:5000/api/colors")
  //     .then(res => setColor(res.data))
  //     .catch(err => console.log(err.response));

  // }, [])
    
  // const updateColor = updatedColor => {
  //       setColor(color.map(color => (
  //         color.id === updatedColor.id ? updatedColor : color
  //       )));
  //     };

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    axiosWithAuth()
      .put(`http://localhost:5000/api/colors/${colorToEdit.id}`, colorToEdit)
      .then(res => {
        console.log("PUT success", res);
      })
      .catch(err => console.log(err.response));

    updateColors(
      colors.map(color => {
        if (color.id === colorToEdit.id) {
          return colorToEdit;
        } else {
          return color;
        }
      })
    );
  };
  // axiosWithAuth()
  //   .put(`https://localhost:5000/api/colors/${colorToEdit.id}`, colorToEdit)
  //   .then(res => {
  //     console.log("color-list",res)
  //     setEditing(true)
  //     setColorToEdit(initialColor)
  //     updateColors(res.data)
      
  //   })
  //   .catch(err => console.log("error", err.response))
  // };

  const deleteColor = color => {
    axiosWithAuth()
      .delete(`https://localhost:5000/api/colors/${colorToEdit.id}`)
      .then(res => {
        console.log("delete", res)
       updateColors(res.data);
      })
      .catch(err => console.log("error",err.response));

      updateColors(colors.filter(el => el.id != color.id));
    
  };
  

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={() => deleteColor(color)}>
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
    </div>
  );
};

export default ColorList;
