var DEF_GAME_STATE;
(function (DEF_GAME_STATE) {
    DEF_GAME_STATE[DEF_GAME_STATE["PREPARE"] = 0] = "PREPARE";
    DEF_GAME_STATE[DEF_GAME_STATE["BEGIN"] = 1] = "BEGIN";
    DEF_GAME_STATE[DEF_GAME_STATE["PAUSE"] = 2] = "PAUSE";
    DEF_GAME_STATE[DEF_GAME_STATE["WIN"] = 3] = "WIN";
    DEF_GAME_STATE[DEF_GAME_STATE["LOSE"] = 4] = "LOSE";
})(DEF_GAME_STATE || (DEF_GAME_STATE = {}));
;
var DataManage = (function () {
    function DataManage() {
    }
    //创建所有的方块
    DataManage.InitData = function () {
        this.m_nCurLevel = 0;
        this.m_nGameState = 0 /* PREPARE */;
        this.isRunning = false;
    };

    //重新开始游戏
    DataManage.Restart = function () {
        if (this.m_nUnLockLevel > this.m_nCurLevel) {
            this.m_nCurLevel++;
        }
        this.m_nCurLeftTime = this.m_nMaxLeftTime;
    };
    DataManage.OnWin = function () {
        this.m_nGameState = 3 /* WIN */;
        this.m_nUnLockLevel++;
    };
    DataManage.OnLose = function () {
        this.m_nGameState = 4 /* LOSE */;
    };
    DataManage.m_nScore = 0;
    DataManage.m_nUnLockLevel = 0;
    DataManage.m_nCurLevel = 0;
    DataManage.m_nGameState = 0;
    DataManage.isRunning = false;
    DataManage.m_nMaxLeftTime = 30;
    DataManage.m_nCurLeftTime = 0;
    DataManage.m_nGameViewWidth = 0;
    DataManage.m_nGameViewHeight = 0;
    return DataManage;
})();
DataManage.prototype.__class__ = "DataManage";
