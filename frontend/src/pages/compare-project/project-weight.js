import { useDispatch, useSelector } from "react-redux"
import { setWeight } from "../../redux/projectReducer"

export function ProjectWeight() {
    const dispatch = useDispatch();
    const weight = useSelector(it => it.project.weight)

    const options = Array.from({ length: 10 }, (_, i) => i + 1).map(option => <option key={option} value={option}>{option}</option>)
    options.unshift(<option key="un-select" value="-1">DISABLE</option>)
    
    const onWeightChange = (event) => {
        let metricName = event.target.name
        let value = event.target.value
        let disabled = value === "-1"

        return dispatch(setWeight({ 
            key: metricName, 
            weight: +value, 
            disabled: disabled 
        }));
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
                        <select name="license_type" value={weight.license_type.weight} onInput={onWeightChange}>{options}</select>
                    </span>
                </div>
            </div>

            <div className="item-box">
                <div className='item-list hide'>
                    <span className='bold'>Empty</span>
                </div>
                <div className='item-list'>
                    <span>
                        <select name="community_size" value={weight.community_size.weight} onInput={onWeightChange}>{options}</select>
                    </span>
                </div>
                <div className='item-list'>
                    <span>
                        <select name="availavility_forum" value={weight.availavility_forum.weight} onInput={onWeightChange}>{options}</select>
                    </span>
                </div>
                <div className='item-list'>
                    <span>
                        <select name="support_contributor" value={weight.support_contributor.weight} onInput={onWeightChange}>{options}</select>
                    </span>
                </div>
                <div className='item-list'>
                    <span>
                        <select name="professional_support" value={weight.professional_support.weight} onInput={onWeightChange}>{options}</select>
                    </span>
                </div>
            </div>

            <div className="item-box">
                <div className='item-list hide'>
                    <span className='bold'>Empty</span>
                </div>
                <div className='item-list'>
                    <span>
                        <select name="maturity" value={weight.maturity.weight} onInput={onWeightChange}>{options}</select>
                    </span>
                </div>
                <div className='item-list'>
                    <span>
                        <select name="development_lang_popularity" value={weight.development_lang_popularity.weight} onInput={onWeightChange}>{options}</select>
                    </span>
                </div>
                <div className='item-list'>
                    <span>
                        <select name="document" value={weight.document.weight} onInput={onWeightChange}>{options}</select>
                    </span>
                </div>
                <div className='item-list'>
                    <span>
                        <select name="learning_material" value={weight.learning_material.weight} onInput={onWeightChange}>{options}</select>
                    </span>
                </div>
            </div>

            <div className="item-box">
                <div className='item-list hide'>
                    <span className='bold'>Empty</span>
                </div>
                <div className='item-list'>
                    <span>
                        <select name="cost" value={weight.cost.weight} onInput={onWeightChange}>{options}</select>
                    </span>
                </div>
                <div className='item-list'>
                    <span>
                        <select name="new_feature" value={weight.new_feature.weight} onInput={onWeightChange}>{options}</select>
                    </span>
                </div>
                <div className='item-list'>
                    <span>
                        <select name="continuing_change" value={weight.continuing_change.weight} onInput={onWeightChange}>{options}</select>
                    </span>
                </div>
            </div>

            <div className="item-box">
                <div className='item-list hide'>
                    <span className='bold'>Empty</span>
                </div>
                <div className='item-list'>
                    <span>
                        <select name="code_quality" value={weight.code_quality.weight} onInput={onWeightChange}>{options}</select>
                    </span>
                </div>
                <div className='item-list'>
                    <span>
                        <select name="reliability" value={weight.reliability.weight} onInput={onWeightChange}>{options}</select>
                    </span>
                </div>
                <div className='item-list'>
                    <span>
                        <select name="maintainability" value={weight.maintainability.weight} onInput={onWeightChange}>{options}</select>
                    </span>
                </div>
                <div className='item-list'>
                    <span>
                        <select name="security" value={weight.security.weight} onInput={onWeightChange}>{options}</select>
                    </span>
                </div>
                <div className='item-list'>
                    <span>
                        <select name="testibility" value={weight.testibility.weight} onInput={onWeightChange}>{options}</select>
                    </span>
                </div>
                <div className='item-list'>
                    <span>
                        <select name="co_existence" value={weight.co_existence.weight} onInput={onWeightChange}>{options}</select>
                    </span>
                </div>
                <div className='item-list'>
                    <span>
                        <select name="performance" value={weight.performance.weight} onInput={onWeightChange}>{options}</select>
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