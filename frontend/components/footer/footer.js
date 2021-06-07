export default function Footer(){
    return (
        <footer class="footer bg-gray-200 px-44 relative pt-1 border-b-2 border-blue-700">
            <div class="container mx-auto px-6">

                <div class="sm:flex sm:mt-8">
                    <div class="mt-8 sm:mt-0 sm:w-full sm:px-8 flex flex-col md:flex-row justify-around">
                        <div class="flex flex-col">
                            <span class="font-bold text-gray-700 uppercase mb-2">Главные</span>
                            <span class="my-2"><a href="/" class="text-blue-700  text-md hover:text-blue-500">Главная страница</a></span>
                            <span class="my-2"><a href="/actions" class="text-blue-700  text-md hover:text-blue-500">Все события</a></span>
                        </div>
                        <div class="flex flex-col">
                            <span class="font-bold text-gray-700 uppercase mt-4 md:mt-0 mb-2">Социальные сети</span>
                            <span class="my-2"><a href="http://instagram.com/" class="text-blue-700 text-md hover:text-blue-500">Instagram</a></span>
                            <span class="my-2"><a href="http://telegram.com/" class="text-blue-700  text-md hover:text-blue-500">Telegram</a></span>
                            <span class="my-2"><a href="http://facebook.com/" class="text-blue-700 text-md hover:text-blue-500">Facebook</a></span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container mx-auto px-6">
                <div class="mt-16 border-t-2 border-gray-300 flex flex-col items-center">
                    <div class="sm:w-2/3 text-center py-6">
                        <p class="text-sm text-blue-700 font-bold mb-2">
                            © 2021 by Adil
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}