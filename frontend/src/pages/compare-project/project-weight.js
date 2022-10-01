import { useDispatch, useSelector } from "react-redux"
import { setWeight } from "../../redux/projectReducer"

export function ProjectWeight() {
    const dispatch = useDispatch();
    const weight = useSelector(it => it.project.weight)
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
                        <select name="license" value={weight.license} onInput={onWeightChange}>{options}</select>
                    </span>
                </div>
            </div>

            <div className="item-box">
                <div className='item-list hide'>
                    <span className='bold'>Empty</span>
                </div>
                <div className='item-list'>
                    <span>
                        <select name="community_size" value={weight.community_size} onInput={onWeightChange}>{options}</select>
                    </span>
                </div>
                <div className='item-list'>
                    <span>
                        <select name="availavility_forum" value={weight.availavility_forum} onInput={onWeightChange}>{options}</select>
                    </span>
                </div>
                <div className='item-list'>
                    <span>
                        <select name="contributor" value={weight.contributor} onInput={onWeightChange}>{options}</select>
                    </span>
                </div>
                <div className='item-list'>
                    <span>
                        <select name="professional_support" value={weight.professional_support} onInput={onWeightChange}>{options}</select>
                    </span>
                </div>
            </div>

            <div className="item-box">
                <div className='item-list hide'>
                    <span className='bold'>Empty</span>
                </div>
                <div className='item-list'>
                    <span>
                        <select name="maturity" value={weight.maturity} onInput={onWeightChange}>{options}</select>
                    </span>
                </div>
                <div className='item-list'>
                    <span>
                        <select name="development_lang" value={weight.development_lang} onInput={onWeightChange}>{options}</select>
                    </span>
                </div>
                <div className='item-list'>
                    <span>
                        <select name="document" value={weight.document} onInput={onWeightChange}>{options}</select>
                    </span>
                </div>
            </div>

            <div className="item-box">
                <div className='item-list hide'>
                    <span className='bold'>Empty</span>
                </div>
                <div className='item-list'>
                    <span>
                        <select name="code_quality" value={weight.code_quality} onInput={onWeightChange}>{options}</select>
                    </span>
                </div>
                <div className='item-list'>
                    <span>
                        <select name="reliability" value={weight.reliability} onInput={onWeightChange}>{options}</select>
                    </span>
                </div>
                <div className='item-list'>
                    <span>
                        <select name="maintainability" value={weight.maintainability} onInput={onWeightChange}>{options}</select>
                    </span>
                </div>
                <div className='item-list'>
                    <span>
                        <select name="security" value={weight.security} onInput={onWeightChange}>{options}</select>
                    </span>
                </div>
                <div className='item-list'>
                    <span>
                        <select name="testibility" value={weight.testibility} onInput={onWeightChange}>{options}</select>
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