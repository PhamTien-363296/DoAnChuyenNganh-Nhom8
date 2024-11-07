

export const themTruyen = async (req, res) => {
    try {
        const { tenDichVu, moTaDV, giaTien, /* kyNang, */ thoiGianHoanThanh, trangThaiDV, idDanhMucDV } = req.body;

        const dichVuMoi = new Dichvu({
            tenDichVu,
            moTaDV,
            giaTien,
           /*  kyNang, */
            thoiGianHoanThanh,
            trangThaiDV,
            idDanhMucDV
        });

        await dichVuMoi.save();

        const danhMuc = await Danhmuc.findById(idDanhMucDV);
        if (!danhMuc) {
            console.log("Không tìm thấy danh mục với ID:", idDanhMucDV); // Log ID danh mục
            return res.status(404).json({ message: "Không tìm thấy danh mục" });
        }

        danhMuc.idDichVuDM.push(dichVuMoi._id); 
        await danhMuc.save();

        res.status(201).json(dichVuMoi);

    } catch (error) {
        console.log("Lỗi themDichVu controller", error.message);
        return res.status(500).json({ error: "Lỗi 500" });
    }
};
