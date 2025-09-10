import { Button, Card, CardContent, Typography } from "@mui/material";


type Props = {
    text: string;
    onDelete: () => void;
}

export function Tweet({ text, onDelete }: Props) {
    return (
        <Card sx={{ margin: '10px 0', padding: '30px' }}>
            <CardContent>
                <Typography variant="body1" component="p">
                    {text}
                </Typography>
                <Button onClick={onDelete} variant="contained" color="error" sx={{ marginTop: '10px' }}>
                    Zmazať
                </Button>
            </CardContent>
        </Card>
    )
}