import { Request, Response } from 'express';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import fs from 'fs';
import path from 'path';

const certificadosController = {
    getCertificados: async (req: Request, res: Response) => {
        const nome: string = req.body.nome.toUpperCase();
        const projeto: string = req.body.projeto.toUpperCase();
        const horas: number = req.body.horas;

        const Data = new Date().toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        });

        const text = `Certificamos que ${nome} foi voluntário(a) no projeto 
${projeto}, promovido e realizado 
pela Universidade Tecnológica Federal do Paraná - Campus Cornélio Procópio, 
com carga horária de ${horas} horas.
                        
Cornélio Procópio, ${Data}.`;

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
            y: 300,
            size: 16,
            font,
            color: rgb(0, 0, 0)
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