import { Request, Response } from 'express';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import fs from 'fs';
import path from 'path';

const certificadosController = {
    getCertificados: async (req: Request, res: Response) => {
        const nome: string = req.body.nome;
        const horas: number = req.body.horas;

        const text = `Certificamos que o(a) aluno(a) ${nome} 
participou do curso do ELLP promovido pela UTFPR-CP, totalizando 
${horas} horas de atividades.
                        
Cornélio Procópio, Paraná.`;

        const templatePath = path.resolve(__dirname, '..', 'docs', 'template-certificado.pdf');

        if (!fs.existsSync(templatePath)) {
            return res.status(500).send('Arquivo de template não encontrado.');
        }

        const templateBytes = fs.readFileSync(templatePath);
        const pdfDoc = await PDFDocument.load(templateBytes);
        const page = pdfDoc.getPages()[0];

        const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

        page.drawText(text, {
            x: 150,
            y: 370,
            size: 16,
            font,
            color: rgb(28/255, 48/255, 85/255)
        });

        const pdfBytes = await pdfDoc.save();

        res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': `attachment; filename=Certificado_${nome.trim()}.pdf`,
        });

        res.send(Buffer.from(pdfBytes));
    }
}

export default certificadosController;