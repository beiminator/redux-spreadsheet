function CommandBar({
  handleAddBefore,
  handleAddAfter,
  handleRemoveBefore,
  handleRemoveAfter,
}) {
  return (
    <div style={{ position: "fixed", top: "60px" }}>
      {/* <input style={{ display: "block" }} type="text" autoFocus /> */}
      <button onClick={handleAddBefore}>Add Before</button>
      <button onClick={handleAddAfter}>Add After</button>
      <button onClick={handleRemoveBefore}>Remove Before</button>
      <button onClick={handleRemoveAfter}>Remove After</button>
    </div>
  );
}

export default CommandBar;
