import { Dialog } from "@mui/material"
import './style.scss'

const CardDiolog = ({ handleClose, open, data }) => {
    return (
        <Dialog
            onClose={handleClose}
            open={open}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <div className="card--dialog">
                <h3 className="card--dialog--heading">
                    Job Description
                </h3>
                <h4>
                    {data?.companyName}
                </h4>
                <h4>
                    About Company
                </h4>
                <p>{data?.jobDetailsFromCompany}</p>
            </div>

        </Dialog>
    )
}

export default CardDiolog;