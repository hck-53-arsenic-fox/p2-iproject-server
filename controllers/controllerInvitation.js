const { Invitations, Musics, Greets, Users } = require("../models");

class Controller{    
    static async getInvitation(req, res, next){
        try {
            let data = await Invitations.findAll({
                include: 
                    [
                        {model: Musics,
                            attributes: {
                                exclude: ['createdAt', 'updatedAt']
                            }},
                        {model: Users,
                            include: {model:Greets,
                            
                        attributes: {
                            exclude: ['createdAt', 'updatedAt']
                        }},
                        attributes: {
                            exclude: ['password', 'role', 'createdAt', 'updatedAt']
                        }}],
                        attributes: {
                            exclude: ['createdAt', 'updatedAt']
                        }
            })
            res.status(200).json(data)
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    static async getInvitationById(req, res, next){
        try {
            let id = req.params.id  || ''
            let data = await Invitations.findOne({
                where: { id },
                include: 
                    [
                        {model: Musics,
                            attributes: {
                                exclude: ['createdAt', 'updatedAt']
                            }},
                        {model: Users,
                            include: {model:Greets,
                            
                        attributes: {
                            exclude: ['createdAt', 'updatedAt']
                        }},
                        attributes: {
                            exclude: ['password', 'role', 'createdAt', 'updatedAt']
                        }}],
                        attributes: {
                            exclude: ['createdAt', 'updatedAt']
                        }
            })

            if (!data) {
                throw { name: "notFound" }
            }

            res.status(200).json(data)
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    static async editInvitation(req, res, next){        
        try {
            const { id } = req.params
            const UserId = req.user.id;
            const {
                    quote, quote_src,
                    bride, bride_img, bride_nick, bride_mother, bride_father,
                    groom, groom_img, groom_nick, groom_mother, groom_father,
                    matrimony_name, matrimony_date, matrimony_time_start, matrimony_time_end,
                    ceremonial_name, ceremonial_date, ceremonial_time_start, ceremonial_time_end,
                    map_location,
                    photo,
                    story, story_img,
                    wallet_bank, wallet_no, wallet_owner,
                    MusicId
                } = req.body
            
                let data = await Invitations.findByPk(id)

                if (!data) {
                    throw { name: "notFound" }
                }

            await Invitations.update(
                { 
                    quote, quote_src,
                    bride, bride_img, bride_nick, bride_mother, bride_father,
                    groom, groom_img, groom_nick, groom_mother, groom_father,
                    matrimony_name: matrimony_name || 'Akad', matrimony_date, matrimony_time_start, matrimony_time_end,
                    ceremonial_name: ceremonial_name || 'Resepsi' , ceremonial_date, ceremonial_time_start, ceremonial_time_end,
                    map_location,
                    photo,
                    story, story_img,
                    wallet_bank, wallet_no, wallet_owner,
                    MusicId
                }, 
                { where: {id}}
                )               


            res.status(201).json({ message: `Undangan Sudah Terupdate`})
        } catch (error) {
            console.log(error);
            next(error)
        }
    }


    static async addInvitation(req, res, next){        
        try {
            const UserId = req.user.id;
            const {
                    quote, quote_src,
                    bride, bride_img, bride_nick, bride_mother, bride_father,
                    groom, groom_img, groom_nick, groom_mother, groom_father,
                    matrimony_name, matrimony_date, matrimony_time_start, matrimony_time_end,
                    ceremonial_name, ceremonial_date, ceremonial_time_start, ceremonial_time_end,
                    map_location,
                    photo,
                    story, story_img,
                    wallet_bank, wallet_no, wallet_owner,
                    MusicId
                } = req.body
            
            await Invitations.create(
                { 
                    quote, quote_src,
                    bride, bride_img, bride_nick, bride_mother, bride_father,
                    groom, groom_img, groom_nick, groom_mother, groom_father,
                    matrimony_name: matrimony_name || 'Akad', matrimony_date, matrimony_time_start, matrimony_time_end,
                    ceremonial_name: ceremonial_name || 'Resepsi' , ceremonial_date, ceremonial_time_start, ceremonial_time_end,
                    map_location,
                    photo,
                    story, story_img,
                    wallet_bank, wallet_no, wallet_owner,
                    MusicId, UserId
                }
                )               


            res.status(201).json({ message: `Undangan ${bride_nick} & ${groom_nick} Berhasil dibuat`})
        } catch (error) {
            console.log(error);
            next(error)
        }
    }


}

module.exports = Controller