import { useDispatch, useSelector } from "react-redux"
import { setWeight } from "../../redux/projectReducer"

export function ProjectWeight() {
    const dispatch = useDispatch();
    const options = Array.from({ length: 10 }, (_, i) => i + 1).map(option => <option key={option} value={option}>{option}</option>);

    function onWeightChange(event) {
        let metricName = event.target.name
        let value = event.target.value
        dispatch(setWeight({ key: metricName, value: +value }));
    }

    return (
        <div className="card-item project metric weighted">
            <div className="item-box">
                <div className='item-list'>
                    <span className='bold'>Weight</span>
                </div>
                <div className='item-list hide'>
                    <span className='bold'>None</span>
                </div>
                <div className='item-list'>
                    <span className='bold'>-</span>
                </div>
                <div className='item-list'>
                    <span className='bold'>-</span>
                </div>
                <div className='item-list'>
                    <span className='bold'>-</span>
                </div>
                <div className='item-list'>
                    <span className='bold'>-</span>
                </div>
                <div className='item-list'>
                    <span className='bold'>-</span>
                </div>
                <div className='item-list'>
                    <span className='bold'>-</span>
                </div>
            </div>

            <div className="item-box">
                <div className='item-list hide'>
                    <span className='bold'>Empty</span>
                </div>
                <div className='item-list'>
                    <span>
                        <select name="license" onInput={onWeightChange}>{options}</select>
                    </span>
                </div>
            </div>

            <div className="item-box">
                <div className='item-list hide'>
                    <span className='bold'>Empty</span>
                </div>
                <div className='item-list'>
                    <span>
                        <select name="community_size" onInput={onWeightChange}>{options}</select>
                    </span>
                </div>
                <div className='item-list'>
                    <span>
                        <select name="availavility_forum" onInput={onWeightChange}>{options}</select>
                    </span>
                </div>
                <div className='item-list'>
                    <span>
                        <select name="contributor" onInput={onWeightChange}>{options}</select>
                    </span>
                </div>
                <div className='item-list'>
                    <span>
                        <select name="professional_support" onInput={onWeightChange}>{options}</select>
                    </span>
                </div>
            </div>

            <div className="item-box">
                <div className='item-list hide'>
                    <span className='bold'>Empty</span>
                </div>
                <div className='item-list'>
                    <span>
                        <select name="maturity" onInput={onWeightChange}>{options}</select>
                    </span>
                </div>
                <div className='item-list'>
                    <span>
                        <select name="development_lang" onInput={onWeightChange}>{options}</select>
                    </span>
                </div>
                <div className='item-list'>
                    <span>
                        <select name="document" onInput={onWeightChange}>{options}</select>
                    </span>
                </div>
            </div>

            <div className="item-box">
                <div className='item-list hide'>
                    <span className='bold'>Empty</span>
                </div>
                <div className='item-list'>
                    <span>
                        <select name="code_quality" onInput={onWeightChange}>{options}</select>
                    </span>
                </div>
                <div className='item-list'>
                    <span>
                        <select name="reliability" onInput={onWeightChange}>{options}</select>
                    </span>
                </div>
                <div className='item-list'>
                    <span>
                        <select name="maintainability" onInput={onWeightChange}>{options}</select>
                    </span>
                </div>
                <div className='item-list'>
                    <span>
                        <select name="security" onInput={onWeightChange}>{options}</select>
                    </span>
                </div>
                <div className='item-list'>
                    <span>
                        <select name="testibility" onInput={onWeightChange}>{options}</select>
                    </span>
                </div>
            </div>

            <div className="item-box">
                <div className='item-list hide'>
                    <span className='bold'>Empty</span>
                </div>
                <div className='item-list hide'>
                    <span>Overall Quality</span>
                </div>
            </div>
        </div>
    )
}