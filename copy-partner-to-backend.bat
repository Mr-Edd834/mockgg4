@echo off
echo ========================================
echo  Copying Partner Files to GGbackend
echo ========================================
echo.

set BACKEND_PATH=C:\Users\Macharia\Documents\GGbackend

echo Checking if GGbackend folder exists...
if not exist "%BACKEND_PATH%" (
    echo ERROR: GGbackend folder not found at %BACKEND_PATH%
    pause
    exit /b 1
)

echo Creating directories if needed...
if not exist "%BACKEND_PATH%\controllers" mkdir "%BACKEND_PATH%\controllers"
if not exist "%BACKEND_PATH%\models" mkdir "%BACKEND_PATH%\models"
if not exist "%BACKEND_PATH%\routes" mkdir "%BACKEND_PATH%\routes"

echo.
echo Copying Partner backend files...
echo [1/3] Copying Partner.js model...
copy "backend-auth-files\models\Partner.js" "%BACKEND_PATH%\models\Partner.js" >nul
if %errorlevel% equ 0 (echo ✓ Partner.js copied) else (echo ✗ Failed to copy Partner.js)

echo [2/3] Copying partnerController.js...
copy "backend-auth-files\controllers\partnerController.js" "%BACKEND_PATH%\controllers\partnerController.js" >nul
if %errorlevel% equ 0 (echo ✓ partnerController.js copied) else (echo ✗ Failed to copy partnerController.js)

echo [3/3] Copying partnerRoutes.js...
copy "backend-auth-files\routes\partnerRoutes.js" "%BACKEND_PATH%\routes\partnerRoutes.js" >nul
if %errorlevel% equ 0 (echo ✓ partnerRoutes.js copied) else (echo ✗ Failed to copy partnerRoutes.js)

echo.
echo ========================================
echo  ✓ All Partner files copied!
echo ========================================
echo.
echo NEXT STEPS:
echo.
echo 1. Open your GGbackend/server.js file
echo.
echo 2. Add this line at the top with imports:
echo    const partnerRoutes = require('./routes/partnerRoutes');
echo.
echo 3. Add this line after your other routes:
echo    app.use('/api/partners', partnerRoutes);
echo.
echo 4. Restart your backend:
echo    node server.js
echo.
echo 5. Test the partnership form:
echo    Go to http://localhost:3000/partner
echo.
echo For full details, see backend-partner-setup.txt
echo.
pause

