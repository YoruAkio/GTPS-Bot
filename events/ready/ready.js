module.exports = {
    name: "ready",
    once: true,
    kioEventRun: async (client) => {
        console.log(`🖥 ${client.user.tag} Logged into discord!`);
    },
};
