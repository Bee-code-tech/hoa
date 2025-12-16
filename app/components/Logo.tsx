import Image from 'next/image'

export function Logo(props: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div {...props}>
      <Image 
        src="/logo.png" 
        alt="HOA House of Abundance Logo" 
        width={109} 
        height={40}
        className="h-10 w-auto"
      />
    </div>
  )
}
