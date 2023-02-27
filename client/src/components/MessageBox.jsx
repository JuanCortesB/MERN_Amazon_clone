import Alert from "react-bootstrap/Alert"

const MessageBox = (props) => {

    return(
        <Alert variant ={ PaymentResponse.variant || "info"}>{props.children}
    </Alert>
    )

}

export default MessageBox;