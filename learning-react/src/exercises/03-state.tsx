import { useState } from "react";

function ThirdComponent() {
    const [counter, setCounter] = useState(0)
    return (
        <button type="button" disabled={counter == 10} onClick={() => setCounter(counter + 1)}>
            Dame click {counter}
        </button>
    )
}
export default ThirdComponent;