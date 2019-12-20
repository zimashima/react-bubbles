import React, { useState} from "react";
import { axiosWithAuth } from "./utils/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = (props) => {
  const { colors, updateColors } = props
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  //stretch add
  const [adding, setAdding] = useState(false);
  const [colorToAdd, setColorToAdd] = useState(initialColor);

  const addColor = e =>{
    e.preventDefault();
    axiosWithAuth().post('/colors', colorToAdd).then(res => {
      axiosWithAuth().get('/colors').then(res => updateColors(res.data))
      setColorToAdd(initialColor)
      setAdding(false)
    })
  }


  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    axiosWithAuth().put(`/colors/${colorToEdit.id}`, colorToEdit)
    .then(res => {
      axiosWithAuth().get('/colors')
        .then( res => updateColors(res.data))
      setColorToEdit(initialColor)
      setEditing(false)
    })
    
    .catch(err => console.log(err))
  };

  const deleteColor = color => {
    axiosWithAuth().delete(`/colors/${color.id}`).then(axiosWithAuth().get('/colors')
    .then( res => updateColors(res.data)))
  };

  return (
    <div className="colors-wrap">
      <h3>colors</h3>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
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
    
      <div/>
      <form onSubmit={addColor}>
          <legend>add a new color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToAdd({ ...colorToAdd, color: e.target.value })
              }
              value={colorToAdd.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToAdd({
                  ...colorToAdd,
                  code: { hex: e.target.value }
                })
              }
              value={colorToAdd.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">add</button>
            <button onClick={() => setColorToAdd(initialColor)}>cancel</button>
          </div>
        </form>
    </div>
  );
};

export default ColorList;
