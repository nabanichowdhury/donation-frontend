import HelpForm from '@/components/ui/HelpForm/HelpForm';

const HelpPage = () => {
    return (
        <section className=''>
            <div className="container mx-auto p-5 md:p-0 h-[calc(100vh-68px)] flex justify-center items-center">
                <HelpForm />
            </div>
        </section>
    );
};

export default HelpPage;