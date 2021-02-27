// const updateInput = (ref, checked) => {
//     const input = ref.current;
//     if (input) {
//         input.checked = checked;
//         input.indeterminate = checked == null;
//     }
// };

// const ThreeStateCheckbox = ({name, checked, onChange}) => {
//     const inputRef = React.useRef(null);
//     const checkedRef = React.useRef(checked);
//     React.useEffect(() => {
//         checkedRef.current = checked;
//         updateInput(inputRef, checked);
//     }, [checked]);
//     const handleClick = () => {
//         switch (checkedRef.current) {
//             case false:
//                 checkedRef.current = null;
//                 break;
//             case null:
//                 checkedRef.current = true;
//                 break;
//             default: // true
//                 checkedRef.current = false;
//             break;
//       }
//       updateInput(inputRef, checkedRef.current);
//       if (onChange) {
//         onChange(checkedRef.current);
//       }
//     };
//     return (
//         <input 
//         ref={inputRef}
//         type="checkbox"
//         name={name}
//         onClick={handleClick} />
//     );
// };

// const [checked, setChecked] = React.useState(true);
// const handleChange = (checked) => {
//     console.log(`checked: ${checked}`);
// };


// export const ThreeStateCheckbox = ({name, checked, onChange}) => {
//     const inputRef = React.useRef(null);
//     const checkedRef = React.useRef(checked);
//     React.useEffect(() => {
//         checkedRef.current = checked;
//         updateInput(inputRef, checked);
//     }, [checked]);
//     const handleClick = () => {
//         switch (checkedRef.current) {
//             case false:
//                 checkedRef.current = null;
//                 break;
//             case null:
//                 checkedRef.current = true;
//                 break;
//             default: // true
//                 checkedRef.current = false;
//             break;
//       }
//       updateInput(inputRef, checkedRef.current);
//       if (onChange) {
//         onChange(checkedRef.current);
//       }
//     };
//     return (
//         <input 
//         ref={inputRef}
//         type="checkbox"
//         name={name}
//         onClick={handleClick} />
//     );
// };