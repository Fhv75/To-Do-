import { IconButton } from "@chakra-ui/react"

interface CardButtonProps {
    onClick: () => void,
    icon: React.ReactElement
    display?: string
}

function CardButton(props: CardButtonProps) {
    return <IconButton
        variant="outline"
        colorScheme="gray"
        aria-label="Delete Task"
        icon={props.icon}
        me={4}
        onClick={props.onClick} 
        display={props.display}
        />
        
}

export default CardButton